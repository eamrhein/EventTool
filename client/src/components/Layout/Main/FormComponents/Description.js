import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, TextArea, Heading, Text } from "grommet";
import { FaReadme } from "react-icons/fa";
import { FormFieldLabel } from "../../../Custom/FormFieldLabel";

class Description extends React.Component {
  state = {
    editor: "",
  };
  handleEditorChange = (e) => {
    console.log(e.target.getContent());
    this.setState({ editor: e.target.getContent() });
    console.log(this.state);
  };

  render() {
    return (
      <Box pad="small" width="100vw">
        <Heading color={{ light: "light-6", dark: "dark-6" }} level="2">
          <FaReadme style={{ verticalAlign: "bottom" }} />
          <Text color={{ light: "dark-1", dark: "light-1" }} size="xlarge">
            {" "}
            Basic Info
          </Text>
        </Heading>
        <Box margin="small">
          <FormFieldLabel
            help="Summary"
            info={
              <Box align="end">
                <Text size="small"> / 140</Text>
              </Box>
            }
          >
            <TextArea
              placeholder="Write a short event summary to get attendees excited"
              size="xsmall"
              plain
              resize={false}
            />
          </FormFieldLabel>
        </Box>
        <Box margin="small">
          <Editor
            apiKey="l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic"
            initialValue=""
            init={{
              height: 400,
              resize: false,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | bullist numlist",
            }}
            onChange={this.handleEditorChange}
          />
        </Box>
      </Box>
    );
  }
}

export default Description;
