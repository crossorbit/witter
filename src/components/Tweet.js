import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Weet = ({ weetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); // eslint-disable-line no-unused-vars
    const [newWeet, setNeweet] = useState(weetObj.text); // eslint-disable-line no-unused-vars

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        //console.log(ok);
        if (ok) {
            //console.log(weetObj.id);
            //const data = dbService.doc(`weets/${weetObj.id}`).delete();
            await dbService.doc(`weets/${weetObj.id}`).delete();
            //console.log(data);
            if (weetObj.attachmentUrl !=="")
                await storageService.refFromURL(weetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev); // eslint-disable-line no-unused-vars

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNeweet(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`weets/${weetObj.id}`).update({ text: newWeet});
        setEditing(false);
    }

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            onChange={onChange}
                            value={newWeet} 
                            required 
                            placeholder="Edit your Tweet"
                            autoFocus
                            className="formInput"/>
                        <input 
                            type="submit"
                            value="Update Tweet"
                            className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            ) : (
                <>
                    <h4>{weetObj.text}</h4>
                    {weetObj.attachmentUrl && ( 
                        <img src={weetObj.attachmentUrl} width='50px' height="50px" />
                    )}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}> 
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}> 
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}  
        </div>
    );
};

export default Weet;