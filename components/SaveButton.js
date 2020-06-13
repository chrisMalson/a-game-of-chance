import firebase from "../src/firebase";

const SaveButton = (props) => {
  console.log(props);

  const handleSave = () => {
    const database = firebase.database();

    const randomNumber = Math.floor(Math.random() * 100);

    database.ref("/").set({ randomNumber });
  };

  return <button onClick={handleSave}>Save to Database</button>;
};

export default SaveButton;
