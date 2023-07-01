export default function handler(req, res) {
  const todoArray = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];

  const todoInfo = todoArray.map(function (todo, index) {
    return {
      id: index,
      name: todo,
      isCompleted: index === 0 ? true : false,
    };
  });

  res.status(200).json({ todoInfo });
}
