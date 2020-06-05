import React, { useState, useMemo } from "react";
import { chunk } from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import delImage from "../../util/delete";
import ENV from "../../util/env";

const Admin: React.FC<{ urls?: string[] }> = ({ urls = [] }) => {
  const [idx, setIdx] = useState(0);
  const chunks = useMemo(() => chunk(urls, 20), [urls]);

  if (chunks.length === 0) return <div>No images found.</div>

  // Need to show scrollbars
  document.body.style.overflow = "auto";

  return (
    <div className={"container"}>
      <div className="album py-3 bg-light">
        <section className="jumbotron text-center">
          <div className="container">
            <h2>Admin Panel</h2>
            <p>{urls.length} images available.</p>
            <Pagination chunks={chunks} idx={idx} setIdx={setIdx} />
          </div>
        </section>

        <div className="container">
          <div className="row">
            {chunks[idx] && chunks[idx].map((u) => <Col url={u} key={u} />)}
          </div>
          <div className="row text-center">
            <div className="col">
              <Pagination chunks={chunks} idx={idx} setIdx={setIdx} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Col: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img className="card-img-top" width="100%" src={url} alt={url} />
        <div className="card-body">
          <p className="card-text">{url}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => delImage(url.replace(ENV.BUCKET_HREF, ""))}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IPaginationProps {
  chunks: string[][]
  setIdx: (i: number) => void
  idx: number
}

const Pagination: React.FC<IPaginationProps> = ({ chunks, setIdx, idx }) => {

  return (
    <p>
      {chunks.map((x, i) => {
        return (
          <button
            type="button"
            onClick={() => setIdx(i)}
            className={`btn btn-${
              idx === i ? "primary" : "secondary"
              } my-2 mx-1`}
            key={i}
          >
            {i + 1}
          </button>
        );
      })}
    </p>
  )
}

export default Admin;
