import { useState } from 'react'
import questions from "./assets/questions.json"
import { jsPDF } from "jspdf";
import './App.css'

function App() {
  
  let[currentQIndex,setCurrentQIndex] = useState(0)
  let[currentScore,setCurrentScore] = useState(0)
  let[selectOption,setSelectOption] = useState({})


  const nextQuestion = ()=>{
  //  setSelectOption(null);
   setCurrentQIndex((prevIndex)=>prevIndex + 1)
   
}

 
  console.log(currentScore)
  const selectAnswer = (selectAnswer)=>{
  
    console.log("selectoption",selectOption)
    
    const correctAnswer = questions[currentQIndex].correctAnswer
    if(selectAnswer === correctAnswer){
      setCurrentScore((prevScore)=> prevScore + 1)
    } 

    setSelectOption((prevSelect)=>(
      {
        ...selectOption,
        [currentQIndex]:selectAnswer
      }
    ))
  }

  const handleDownload =()=>{
    const doc = new jsPDF();
    let y = 10;

    questions.forEach((q, index) => {
      // Add Question
      const questionText = `Q${q.id}: ${q.question}`;
      const wrappedQuestion = doc.splitTextToSize(questionText, 180);
      doc.text(wrappedQuestion, 10, y);
      y += wrappedQuestion.length * 10;

      // Add Options
      q.options.forEach((option, i) => {
        doc.text(`${i + 1}. ${option}`, 10, y);
        y += 10;
      });

      // Highlight Correct Answer
      const correctAnswerText = `Correct Answer: ${q.options[q.correctAnswer]}`;
      doc.setFont("helvetica", "bold");
      doc.text(correctAnswerText, 10, y);
      doc.setFont("helvetica", "normal");
      y += 20;

      // Page break if needed
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("quiz.pdf");;
  
    
  
  }

  if(currentQIndex === questions.length){
   
    return (
     <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div  className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Javascript Quiz</h1>
      <p className="text-2xl font-bold text-center text-gray-800 mb-4">Your Score is: {currentScore} out {questions.length}</p>
      <div className="flex justify-between mt-6">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => {
          setCurrentQIndex(0);
          setCurrentScore(0);
          setSelectOption({})
        }}>Restart</button>
        <button  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={handleDownload}>Download Answers</button>
        </div>
      </div>
     </div>
    )
  }

  return (
    <>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Javascript Quiz</h1>

    <div>
      <p className="text-lg font-medium text-gray-700 mb-4">
        {questions[currentQIndex]?.id}.{questions[currentQIndex]?.question}`
      </p>
    </div>

  
      {questions[currentQIndex]?.options.map((option,index)=>(
        
        <div className="space-y-2" key={index}>
        <label className="flex items-center space-x-3 p-2 border rounded-md bg-gray-50 hover:bg-blue-50 cursor-pointer">
        <input
          type="radio"
          name={`question-${currentQIndex}`}
          checked={selectOption[currentQIndex] === index}
          onChange={()=>(selectAnswer(index))}
        
          className="h-4 w-4 text-blue-600 border-gray-300 :text-gray-300"
        />
        <span className="text-gray-600">{option}</span>
      </label>
       </div>
      ))}
   

    
    <div className="flex justify-between mt-6">
      
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={nextQuestion}
        disabled={selectOption[currentQIndex] === undefined}
        >
        Next
      </button>
    </div>
  </div>
</div>

    </>
  )
}

export default App
