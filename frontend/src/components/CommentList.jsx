import React from "react";

export default function CommentList({ comments }) {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <h3 className="font-bold mb-2">Comments</h3>
      {comments && comments.length > 0 ? (
        <ul className="list-none p-0">
          {comments.map((c, idx) => (
            <li key={idx} className="py-2 border-b border-[#444]">
              <span className="font-bold">{c.user}</span>: {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[#888]">No comments yet.</p>
      )}
    </div>
  );
}