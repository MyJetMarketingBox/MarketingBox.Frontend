import React, { useEffect, useState } from "react";
import { Card, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dropzone, { useDropzone } from "react-dropzone";
import { uploadFile } from "../../../../store/regFiles/actions";

interface Props {
  isOpen: boolean,
  toggle: (toggle: boolean) => void,
}

const addFile = ({ isOpen, toggle}: Props) => {
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState<any>([]);


  const { loadingUpload, loadedUpload } = useSelector((state : any) => {
    return {
      loadedUpload: state.RegFiles.loadedUpload,
      loadingUpload: state.RegFiles.loadingUpload
    }
  })


  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setSelectedFiles(files);
  }

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const close = () => {
    toggle(false);
    setSelectedFiles([]);
  };

  useEffect(() => {
    if(!loadingUpload && loadedUpload){
      close();
    }
  }, [loadingUpload, loadedUpload])

  const handleFileUpload = () => {
    //console.log(selectedFiles[0]);
    let formData = new FormData();

    formData.append('file', selectedFiles[0].file);

    /*if (selectedFiles.length) {
      selectedFiles.map((item: any) => {
        console.log(item);
        formData.append('file', item, item.name);
      });
      console.log(formData.get('file'));
    }*/

    dispatch(uploadFile(formData))
  }


  return (
    <Modal isOpen={isOpen} toggle={close} className="modal-dialog-centered">
      <ModalHeader toggle={close} tag="h4">
        Upload File
      </ModalHeader>

      <ModalBody>

        <div className="mb-3 mt-2">
          <Form>
            <Dropzone
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles);
              }}
              multiple={false}
              accept="text/csv"
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone">
                  <div
                    className="dz-message needsclick mt-2"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="mb-3">
                      <i className="display-4 bx bxs-cloud-upload accent-color" />
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                    <em className="text-muted font-size-12">( Only *.csv will be accepted )</em>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className="dropzone-previews mt-3" id="file-previews">
              {selectedFiles.map((f: any, i: number) => {
                return (
                  <Card
                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                    key={i + "-file"}
                  >
                    <div className="p-2">
                      <Row className="align-items-center">
                        <Col>
                          <Link
                            to="#"
                            className="text-muted font-weight-bold"
                          >
                            {f.name}
                          </Link>
                          <p className="mb-0">
                            <strong>{f.formattedSize}</strong>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Form>
        </div>

      </ModalBody>

      <ModalFooter>
        <Row>
          <Col>
            <div className="text-end">
              <button
                type="submit"
                className="btn btnOrange btn-width-250"
                onClick={handleFileUpload}
                disabled={loadingUpload || !selectedFiles.length}
              >
                {loadingUpload && <i className="bx bx-hourglass bx-spin me-2"/>}
                Save
              </button>
            </div>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  )

}

export default addFile;