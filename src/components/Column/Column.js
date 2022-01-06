import Card from "components/Card/Card";
import ConfirmModal from "../Common/ConfirmModal";
import React, { useState, useEffect, useCallback } from "react";
import "./Column.scss";
import { mapOrder } from "utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "./../../utilities/constants";
import {
  selectAllInlineText,
  saveContentAfterPressKeyDown,
} from "../../utilities/contentEditable";
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const [columnTitle, setColumnTitle] = useState("");

  const handleColumnTitleChange = useCallback((e) => {
    setColumnTitle(e.target.value);
  }, []);

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
              <Dropdown.Item>Add card</Dropdown.Item>
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"></i> Add another card
        </div>
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
