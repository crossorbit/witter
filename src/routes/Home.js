import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
    const [weets, setWeets] = useState([]);

    useEffect(() => {
        dbService
        .collection("weets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
            }));
            setWeets(newArray);
        });
    }, []);

    return (
        <div className="container">
        <TweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
            {weets.map((weet) => (
            <Tweet
                key={weet.id}
                weetObj={weet}
                isOwner={weet.creatorId === userObj.uid}
            />
            ))}
        </div>
        </div>
    );
};

export default Home;