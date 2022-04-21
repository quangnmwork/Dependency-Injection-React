const Books = new Array(10).fill(1).map((_: string, index: number) => ({
  name: `Books ${index + 1}`,
  id: index,
}));

const BookList = () => {
  console.log(Books);
  return <div></div>;
};

export default BookList;
