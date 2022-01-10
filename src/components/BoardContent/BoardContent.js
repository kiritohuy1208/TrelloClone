import Column from "components/Column/Column";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./BoardContent.scss";
import { initialData } from "actions/initialData";
import { isEmpty } from "lodash";
import { mapOrder } from "utilities/sort";
import { applyDrag } from "utilities/dragDrop";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootStrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { fetchBoardDetails } from "actions/ApiCall/index";
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const newColumnInputRef = useRef(null); // to manage focus, text selection
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const onNewColumnTitleChange = useCallback(
    (e) => setNewColumnTitle(e.target.value),
    []
  );
  useEffect(() => {
    const boardId = "61d9aae7a0e691e8c908ede6";
    fetchBoardDetails(boardId).then((board) => {
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
    });
  }, []);
  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openNewColumnForm]);
  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    // Cập nhật lại initdata
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((x) => x._id === columnId);

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);
      setColumns(newColumns);
    }
  };

  const addNewColumn = () => {
    if (!newColumnInputRef) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      id: Math.random.toString(36).substring(2, 5),
      boardId: board._id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);
    let newBoards = { ...board };
    newBoards.columnOrder = newColumns.map((c) => c._id);
    newBoards.columns = newColumns;

    setBoard(newBoards);
    setColumns(newColumns);
    setNewColumnTitle("");
    toggleOpenNewColumnForm();
  };

  const onUpdateColumn = (column) => {
    const columnIdToUpdate = column._id;
    let newColumns = [...columns];
    const columnIndexUpdate = newColumns.findIndex(
      (c) => c._id === columnIdToUpdate
    );
    if (column._destroy) {
      newColumns.splice(columnIndexUpdate, 1);
    } else {
      newColumns.splice(columnIndexUpdate, 1, column);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootStrapContainer className="bootstrap-ctn">
        {!openNewColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon"></i> Add another card
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Small text"
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(e) => e.key === "Enter" && addNewColumn()}
              />
              <div className="add-delete-area">
                <Button variant="success" size="sm" onClick={addNewColumn}>
                  Add column
                </Button>
                <span onClick={toggleOpenNewColumnForm} className="cancel-icon">
                  <i className="fa fa-times icon"></i>
                </span>
              </div>
            </Col>
          </Row>
        )}
      </BootStrapContainer>
    </div>
  );
}
export default BoardContent;
