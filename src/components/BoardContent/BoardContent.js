import Column from "components/Column/Column";
import React,{useState,useEffect} from "react";
import "./BoardContent.scss";
import {initialData} from "actions/initialData";
import {isEmpty} from'lodash';
import {mapOrder} from 'utilities/sort';
import {applyDrag} from 'utilities/dragDrop';
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
      console.log("Use effec")
      setColumns( mapOrder(boardFromDb.columns,boardFromDb.columnOrder,'id'));
    }
  }, [])
  if(isEmpty(board)){
    return  <div className="not-found">Board not found</div>
  }
 const onColumnDrop = (dropResult) =>{
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns,dropResult)
   
    // Cập nhật lại initdata
    let newBoard = {...board}
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard) 

  }
  const onCardDrop = (columnId,dropResult) =>{
    if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
      let newColumns = [...columns]

      let currentColumn = newColumns.find(x => x.id===columnId)
      currentColumn.cards = applyDrag(currentColumn.cards,dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
      setColumns(newColumns)
     
      // console.log(dropResult)
      // console.log(columnId)
    }
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
              <Column column= {column} onCardDrop={onCardDrop}/>
            </Draggable>
          ))
        }
        </Container>
        <div className="add-new-column">
            <i className="fa fa-plus icon"></i> Add another card
        </div>
    </div>
  );
}
export default BoardContent;
