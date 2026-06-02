import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your submit logic here
    try {
      await api.post("/notes",
        {title, content}
      );
      toast.success("Note created Sucessfully");
      navigate("/");
    } catch (error) {
      toast.error(`Fail to create note`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link to={'/'} className="btn btn-ghost hover:bg-base-300 mb-6 group">
          <ArrowLeftIcon className="size-5 transition-transform group-hover:-translate-x-1" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-2xl border border-base-content/5">
          <div className="card-body p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <PlusIcon className="size-6 text-primary" />
              </div>
              <h2 className="card-title text-3xl font-bold">Create New Note</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base pb-1">Note Title</span>
                </label>
                <input 
                  className="input input-bordered w-full focus:input-primary transition-all bg-base-200" 
                  type="text" 
                  placeholder="Enter a catchy title..." 
                  value={title} 
                  required
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>

              {/* Content Textarea */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base pb-1">Content</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-48 w-full focus:textarea-primary transition-all bg-base-200 text-lg" 
                  placeholder="Start writing your thoughts here..." 
                  value={content} 
                  required
                  onChange={(e) => setContent(e.target.value)} 
                />
              </div>

              {/* Action Button */}
              <div className="card-actions justify-end mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg px-8 shadow-lg " 
                  disabled={loading || !title || !content}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
