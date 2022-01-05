import React from "react";
import "./Card.scss";

function Card(props) {
  const { card } = props;
  return (
    <div className="card-item .column-drag-handle">
      {card.cover && (
        <img
          maxWidth="100%"
          className="card-cover"
          src={card.cover}
          alt=""
          onMouseDown={(e) => e.preventDefault()}
        />
      )}

      {card.title}
    </div>
  );
}
export default Card;
