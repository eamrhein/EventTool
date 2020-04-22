import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, TextArea, Heading, Text } from "grommet";
import { Book } from "grommet-icons";
import { FormFieldLabel } from "../../../Custom/FormFieldLabel";

class Description extends React.Component {
  state = {
    editor: "",
  };

  render() {
    const { form, setForm } = this.props;
    const handleEditorChange = (e) => {
      setForm({ ...form, description: e.target.getContent() });
    };
    return (
      <Box pad="small" width="100vw">
        <Heading level="2">
          <Book /> Event Description
        </Heading>
        <Box margin="small">
          <FormFieldLabel
            info={
              <Box align="end">
                <Text size="small">{form.summary.length} / 140</Text>
              </Box>
            }
            label="Summary"
          >
            <TextArea
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              placeholder="Write a short event summary to get attendees excited"
              resize={false}
            />
          </FormFieldLabel>
        </Box>
        <Box margin="small">
          <Editor
            apiKey="l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic"
            initialValue={form.description}
            init={{
              height: 400,
              resize: false,
              menubar: false,
              plugins: [
                "advlist autolink lists link image imagetools",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | bullist numlist | image",
            }}
            onChange={handleEditorChange}
            onBlur={handleEditorChange}
          />
        </Box>
      </Box>
    );
  }
}

export default Description;
