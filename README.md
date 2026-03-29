## 🏥 Health Bill Analyzer

A simple web app that helps users understand and visualize their medical bills. Upload a bill image, and the app extracts line items, calculates total cost, and displays a breakdown using a pie chart.

---

## 🚀 Features

- 📄 Upload medical bill images (drag & drop or file picker)
- 🔍 OCR-based text extraction using OCR API
- 🧾 Automatic parsing of bill items and costs
- 📊 Visual breakdown with a pie chart
- 💰 Total cost calculation
- ⚠️ Helpful insight on potentially disputable charges

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Charting:** Chart.js
- **OCR API:** OCR.space
- **Styling:** CSS

---

## 📂 Project Structure
```
├── src/
│   ├── App.jsx        # Main application logic
│   ├── App.css        # Styles
│   └── main.jsx       # Entry point
├── public/
├── .env               # API key (not committed)
└── README.md
```

---

## ⚙️ Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/health-bill-analyzer.git
cd health-bill-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add:
```env
VITE_OCR_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

---

## 🧠 How It Works

1. User uploads a bill image  
2. The app sends the image to the OCR API  
3. Extracted text is parsed using regex to identify:
   - Item names
   - Associated costs  
4. Data is displayed:
   - As a list of charges  
   - As a pie chart visualization  
   - With a calculated total cost  

---

## 💡 Future Improvements

- Better parsing with NLP  
- Categorization of charges  
- Export reports (PDF/CSV)  
- AI-powered bill explanation  
- Support for multi-page documents  

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.
