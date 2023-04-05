import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const PdfViewer = ({ fileUrl }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  console.log(fileUrl)

  return (
    <div
      className="rpv-core__viewer"
      style={{
        display: "flex",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#eeee",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          bottom: "16px",
          display: "flex",
          left: "50%",
          padding: "4px",
          position: "absolute",
          transform: "translate(-50%, 0)",
          zIndex: 1,
        }}
      >
        <Toolbar>
          {(props) => {
            const {
              CurrentPageInput,
              Download,
              EnterFullScreen,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Print,
              ZoomIn,
              ZoomOut,
            } = props;
            return (
              <>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomOut />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomIn />
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <GoToPreviousPage />
                </div>
                <div style={{ padding: "0px 2px", width: "3rem" }}>
                  <CurrentPageInput /> 
                </div>
                <div style={{ padding: "0px 2px"}}>
                  /
                </div>
                <div style={{ padding: "0px 2px"}}>
                  <NumberOfPages />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToNextPage />
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <EnterFullScreen />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Download />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Print />
                </div>
              </>
            );
          }}
        </Toolbar>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
      </div>
    </div>
  );
};

export default PdfViewer;
