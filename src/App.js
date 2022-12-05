import React, { useState } from "react";
import "./App.css";

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Queue",
      items: [
        { id: 1, title: "go to shop" },
        { id: 2, title: "clear basket" },
        { id: 3, title: "eat some tasty" },
      ],
    },
    {
      id: 2,
      title: "Development",
      items: [
        { id: 4, title: "go to home" },
        { id: 5, title: "sleep one hour" },
        { id: 6, title: "make gym" },
      ],
    },
    {
      id: 3,
      title: "Done",
      items: [
        { id: 7, title: "dance with myself" },
        { id: 8, title: "play guitar" },
        { id: 9, title: "write code" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 3px 4px gray'
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  function dropHandler(e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }


  return (
    <div className="app">
      {boards.map((board) => (
        <div 
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, board)}
        className="board"
        
        >
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div 
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
            draggable={true}
            className="item"
            >
              {item.title}
              </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
