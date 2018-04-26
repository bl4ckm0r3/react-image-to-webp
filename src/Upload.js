import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Upload extends PureComponent {
  static propTypes = {};
  reader = new FileReader();
  canvas = document.createElement('canvas');
  image = document.createElement('img');
  state = {
    src: null
  };
  
  constructor(props) {
    super(props);
    this.image.onload = () => {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
      const ctx = this.canvas.getContext('2d');
      ctx.drawImage(this.image, 0,0);
      const src = this.canvas.toDataURL('image/webp', 0.9);
      this.setState({
        src
      });
    }
    this.reader.onload = ({ target: { result: src } }) => {
      this.setState({
        src
      });
    };
  }

  fileUploaded = ({ target: { files } }) => {
    if (files.length > 0) {
      const [uploadedImage] = files;
      this.reader.readAsDataURL(uploadedImage);
    }
  };

  exportImg = () => {
    this.image.src = this.state.src;
  }

  render() {
    const { src } = this.state;
    return (
      <div>
        <input type="file" onChange={this.fileUploaded} />
        {src && (
          <div>
            <button onClick={this.exportImg}>Export</button>
            <img src={src} />
          </div>
        )}
      </div>
    );
  }
}

export default Upload;
