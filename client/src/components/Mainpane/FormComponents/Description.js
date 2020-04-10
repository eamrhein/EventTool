import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, TextArea, Text } from "grommet";

class Description extends React.Component {
  state = {
    editor: ""
  };
  handleEditorChange = e => {
    console.log(e.target.getContent());
    this.setState({ editor: e.target.getContent() });
    console.log(this.state);
  };

  render() {
    return (
      <Box pad="medium" width="100vw">
        <Box margin="small">
          <Text margin="small">Summary</Text>
          <TextArea height="300" />
        </Box>
        <Editor
          apiKey="l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic"
          initialValue=""
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
            bullist numlist"
          }}
          onChange={this.handleEditorChange}
        />
      </Box>
    );
  }
}

export default Description;
