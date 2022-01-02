import Column from "components/Column/Column";
import React,{useState,useEffect} from "react";
import "./BoardContent.scss";
import {initialData} from "actions/initialData";
import {isEmpty} from'lodash';
import {mapOrder} from 'utilities/sort';
import { Container, Draggable } from "react-smooth-dnd";
function BoardContent() {

  const [board, setBoard] = useState({})
  const [columns,setColumns] =useState([])
  
  useEffect(() => {
    const boardFromDb = initialData.boards.find(board => board.id === "board-1");
    if(boardFromDb){
      setBoard(boardFromDb);

      //sort by columnOrder:
      // boardFromDb.columns.sort((a,b)=>{
      //   return boardFromDb.columnOrder.indexOf(a.id)  - boardFromDb.columnOrder.indexOf(b.id);
      // })

      setColumns( mapOrder(boardFromDb.columns,boardFromDb.columnOrder,'id'));
    }
  }, [])
  if(isEmpty(board)){
    return  <div className="not-found">Board not found</div>
  }
 const onColumnDrop = (dropResult) =>{
    console.log(dropResult)
  }
  return (
    <div className="board-content">
       <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
        {
          columns.map((column,index)=>(
            <Draggable key={index}>
              <Column column= {column}/>
            </Draggable>
          ))
        }
        </Container>
    </div>
  );
}
export default BoardContent;
