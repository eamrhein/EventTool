import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, TextArea, Heading, Text, Button, Collapsible } from "grommet";
import { Book } from "grommet-icons";
import { FormFieldLabel } from "../components/FormFieldLabel";

class Description extends React.Component {
  state = {
    editor: "",
    open: false,
  };

  render() {
    const { values, setFieldValue, handleChange } = this.props;
    const handleEditorChange = (e) => {
      setFieldValue("description", e.target.getContent());
    };
    return (
      <Box pad="medium" width="100vw">
        <Button
          plain
          onClick={() =>
            this.setState({ ...this.state, open: !this.state.open })
          }
        >
          <Heading
            color={
              this.state.open
                ? "neutral-2"
                : {
                    dark: "light-1",
                    light: "dark-1",
                  }
            }
            level="2"
          >
            {this.state.open ? "-" : "+"}{" "}
            <Book
              color={
                this.state.open
                  ? "neutral-2"
                  : {
                      dark: "light-1",
                      light: "dark-1",
                    }
              }
              size="medium"
            />{" "}
            Event Description
          </Heading>
        </Button>
        <Collapsible open={this.state.open}>
          <Box margin="small">
            <FormFieldLabel
              info={
                <Box align="end">
                  <Text size="small">{values.summary.length} / 140</Text>
                </Box>
              }
              label="Summary"
            >
              <TextArea
                name="summary"
                value={values.summary}
                onChange={handleChange}
                placeholder="Write a short event summary to get attendees excited"
                resize={false}
              />
            </FormFieldLabel>
          </Box>
          <Box margin="small">
            <Editor
              name="description"
              apiKey="l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic"
              initialValue={values.description}
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
        </Collapsible>
      </Box>
    );
  }
}

export default Description;
