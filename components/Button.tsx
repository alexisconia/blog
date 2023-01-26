const Button = (props: { text: string }) => {
  return <button onClick={() => console.log("Hi!!")}>{props.text}</button>;
};

export default Button;
