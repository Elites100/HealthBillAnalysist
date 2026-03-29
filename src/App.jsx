import { useState, useRef, useEffect } from "react";
import "./App.css";
import Chart from "chart.js/auto";

function parseBill(text){

  const lines = text.split("\n");

  const items = [];

  lines.forEach(line => {

    const match = line.match(/([A-Za-z ]+)\s+\$?(\d+(\.\d+)?)/);

    if(match){
      items.push({
        name: match[1].trim(),
        cost: parseFloat(match[2])
      });
    }

  });

  return items;
}

function App(){

  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [done,setDone] = useState(false);
  const [billData,setBillData] = useState([])

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const analyze = async ()=>{
    if(!file){
      alert("Upload a bill first");
      return;
    }

      setLoading(true);

    const apiKey = import.meta.env.VITE_OCR_API_KEY;
    if (!apiKey) {
      alert("Missing API key. Add VITE_OCR_API_KEY to your .env file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("apikey", apiKey);

    try {
      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData
      });
      
      const data = await res.json();
      const text = data.ParsedResults?.[0]?.ParsedText || "";
      const parsed = parseBill(text);
      
      setBillData(parsed);
    } catch(err) {
      alert("Failed to analyze bill. Try again.");
    }
    setLoading(false);
    setDone(true);
  };

  const handleChange = e=>{
    setFile(e.target.files[0]);
  };

  useEffect(()=>{
    if(done){
      const ctx = canvasRef.current;

      chartRef.current = new Chart(ctx,{
        type:"pie",
        data:{
          labels: billData.map(i=>i.name),
          datasets:[{
            data: billData.map(i=>i.cost),
          }]
        }
      });
    }

    return ()=>{
      if(chartRef.current){
        chartRef.current.destroy();
      }
    };
  },[done]);

  const handleDrop = e=>{
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  if(done && billData.length === 0){
    return (
      <div className="container">
        <p>Unable to read bill. Please try another file.</p>
        <button onClick={()=>window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if(done){
    return(
      <div className="container">
        <h1>Bill Analysis</h1>

        <div className="total">
          Total Cost: ${billData.reduce((sum,item)=>sum+item.cost,0)}
        </div>

        <canvas ref={canvasRef}></canvas>

        <h3>Charges</h3>
        <ul>
          {billData.map((item,i)=>(
            <li key={i}>
              {item.name} — ${item.cost}
            </li>
          ))}
        </ul>

        <div className="warning">
          ⚠ Facility fees are often disputed and vary widely between hospitals.
        </div>


        <br/>
        <button onClick={()=>window.location.reload()}>
          Analyze Another Bill
        </button>
      </div>
    );
  }

  return(
    <div className="container">

      <h1>Health Bill Analyzer</h1>
      <p>Upload your medical bill and we'll explain it</p>

      <div
        className="drop"
        onDragOver={e=>e.preventDefault()}
        onDrop={handleDrop}
        onClick={()=>document.getElementById("fileInput").click()}
      >
        {file ? file.name : "Drop bill here or click to upload"}

        <input
          id="fileInput"
          type="file"
          hidden
          onChange={handleChange}
        />
      </div>

      <button onClick={analyze}>Analyze Bill</button>

      {loading && <p>Analyzing bill...</p>}

    </div>
  );
}

export default App;
