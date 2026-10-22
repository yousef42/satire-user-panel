import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const getItems = () => {
  // Target word for captcha: satrex
  const base = 'satrex'.split('');

  let word = base.map((ch, idx) => ({
    id: `${idx + 1}`,
    content: ch,
  }));

  // Shuffle once to avoid pre-ordered state.
  word = word.sort(() => 0.5 - Math.random());

  return word;
};
// a little function to help us with reordering the result

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  height: '38px',
  width: '40px',
  margin: `0 ${grid}px 0 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  display: 'flex',
  padding: grid,
  overflow: 'hidden',
});

class satrexCaptcha extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ordered: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  isOrdered(items = this.state.items) {
    if (!items.length) return false;
    return items.every((item, index) => index + 1 === parseInt(item.id, 10));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.shuffle !== this.props.shuffle) {
      this.setState({
        items: getItems(),
        ordered: false,
      });
      return;
    }

    if (prevState.items !== this.state.items) {
      const ordered = this.isOrdered(this.state.items);
      if (ordered !== this.state.ordered) {
        this.setState({ ordered });
      }

      if (this.props.captcha) {
        this.props.captcha(() => ordered);
      }
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) this.setState({ items: getItems() });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { ordered, items } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
              className="captchaBackground"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                      className="orderBoxListItem"
                    >
                      <div
                        className="orderBoxText"
                        style={ordered ? { color: '#04DAD8' } : { color: 'red' }}
                      >
                        {item.content}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default satrexCaptcha;
