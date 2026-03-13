export default function Card({ image, title, author, ratings }) {
  return (
      <div className="card mb-3" style={{ maxWidth: 500 }}>
          <div className="row g-0">
              <div className="col-md-4">
                  <img src={image} className="img-fluid rounded-start" alt="kep"/>
              </div>
              <div className="col-md-8">
                  <div className="card-body">
                      <h5 className="card-title fw-bold">{title}</h5>
                      <p className="card-text mt-4">{author}</p>
                      <h4 className="card-text text-body-secondary mt-5">Értékelés:</h4>
                      <h5 className="card-text">⭐ {ratings}</h5>
                  </div>
              </div>
          </div>
      </div>
  )
}