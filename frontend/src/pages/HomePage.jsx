import {useState, useEffect} from "react";
import NavBar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NotesNoteFound from "../components/NotesNotFound.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";




const HomePage = () => {
  const [isRatelimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        console.log(error);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        } else {
          toast.error("Faild to get Notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  

  return (
    <div>
      <NavBar />

      {isRatelimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p4 mt-6">
        {loading && <div className="text-center text-primary py-10">
          Loading notes...
        </div>}
  
        {notes.length === 0 && !isRatelimited && <NotesNoteFound />}
        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note)=>(
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
