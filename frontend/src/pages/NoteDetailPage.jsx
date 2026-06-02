import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Loader2, Trash2Icon, SaveIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();
  
  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to get Note");
      } finally {
        setLoading(false);
      }
    };
  
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="btn btn-ghost hover:bg-base-300 group">
            <ArrowLeftIcon className="size-5 transition-transform group-hover:-translate-x-1" />
            Back to Notes
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-ghost text-error hover:bg-error/10 gap-2"
          >
            <Trash2Icon className="size-5" />
            Delete Note
          </button>
        </div>

        {/* Note Editor Card */}
        <div className="card bg-base-100 shadow-2xl border-t-4 border-solid border-[#3abdf8]">
          <div className="card-body p-8">
            <h2 className="card-title text-3xl font-bold mb-8 text-base-content">Edit Note</h2>

            <div className="space-y-6">
              {/* Title Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full bg-base-200 focus:input-primary transition-all text-lg"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-64 w-full bg-base-200 focus:textarea-primary transition-all text-lg"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Bottom Actions */}
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20" 
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                      <SaveIcon className="size-5" />
                    )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;
