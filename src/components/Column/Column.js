import Card from "components/Card/Card";
import ConfirmModal from "../Common/ConfirmModal";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Column.scss";
import { mapOrder } from "utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "./../../utilities/constants";
import {
  selectAllInlineText,
  saveContentAfterPressKeyDown,
} from "../../utilities/contentEditable";
import { cloneDeep } from "lodash";
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [columnTitle, setColumnTitle] = useState("");
  const handleColumnTitleChange = useCallback((e) => {
    setColumnTitle(e.target.value);
  }, []);

  const [newCardTitle, setNewCardTitle] = useState("");
  const onNewCardTitleChange = useCallback(
    (e) => setNewCardTitle(e.target.value),
    []
  );

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const newCardInputRef = useRef(null);
  useEffect(() => {
    if (newCardInputRef && newCardInputRef.current) {
      newCardInputRef.current.focus();
      newCardInputRef.current.select();
    }
  }, [openNewCardForm]);

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  // action
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }

    setShowConfirmModal(!showConfirmModal);
  };

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };
  // card
  const addNewCard = () => {
    if (!newCardInputRef) {
      newCardInputRef.current.focus();
      return;
    }
    const newCard = {
      id: Math.random.toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null,
    };
    // update column
    const columnUpdate = cloneDeep(column);
    columnUpdate.cards.push(newCard);
    columnUpdate.cardOrder.push(newCard.id);

    onUpdateColumn(columnUpdate);
    setNewCardTitle("");
    toggleOpenNewCardForm();
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Small text"
            className="trello-content-editable"
            value={columnTitle}
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressKeyDown}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              variant="basic"
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>
                Add card
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setShowConfirmModal(!showConfirmModal)}
              >
                Remove Column
              </Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
          groupName="col"
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              placeholder="Add new card..."
              className="textarea-enter-new-card"
              rows="3"
              ref={newCardInputRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => e.key === "Enter" && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-delete-area">
            <Button variant="primary" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-times icon"></i>
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon"></i> Add another card
          </div>
        )}
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure remove <strong>${column.title}</strong>`}
      />
    </div>
  );
}
export default Column;
