import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { NotebookPen, X } from "lucide-react";
import useToggle from "../hooks/useToggle";
interface NoteFeatureProps {}

const Note = (props: NoteFeatureProps) => {
  const ToggleTextArea: React.FC = () => {
    const [isTextAreaVisible, toggleTextArea] = useToggle(false);

    return (
      <div>
        <Button onClick={toggleTextArea}>
          {isTextAreaVisible ? "Close Text Area" : "Open Text Area"}
        </Button>

        {isTextAreaVisible && (
          <Textarea placeholder="Type something here..."></Textarea>
        )}
      </div>
    );
  };
};

export default Note;
