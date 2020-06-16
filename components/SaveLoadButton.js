import firebase from "../src/firebase";
import { Button, Modal } from "@material-ui/core";
import { useState } from "react";

const SaveLoadButton = ({ AuthUser }) => {
  const [open, setOpen] = useState(false);
  const [fileNum, setFileNum] = useState(0);

  const handleSaveLoad = () => {
    const database = firebase.database();

    const randomNumber = Math.floor(Math.random() * 100);

    if (fileNum !== 0) {
      database.ref(`${AuthUser.id}/${fileNum}`).set({ randomNumber });
    } else {
      alert("pick a save file first!");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Save/Load List</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {
          <>
            <div>
              <button disabled={fileNum === 1} onClick={() => setFileNum(1)}>
                <h1>1</h1>
              </button>
              <button disabled={fileNum === 2} onClick={() => setFileNum(2)}>
                <h1>2</h1>
              </button>
              <button disabled={fileNum === 3} onClick={() => setFileNum(3)}>
                <h1>3</h1>
              </button>
            </div>
            <div>
              <button onClick={handleSaveLoad}>
                <h1>Save</h1>
              </button>
            </div>
          </>
        }
      </Modal>
    </>
  );
};

export default SaveLoadButton;
