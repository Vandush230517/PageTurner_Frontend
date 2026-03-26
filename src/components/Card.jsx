export default function Card({ image, title, author, ratings }) {
    return (
        <div className="card mb-3" style={{ maxWidth: 500 }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={image} className="img-fluid rounded-start" alt="kep" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{title}</h5>
                        <p className="card-text mt-3">{author}</p>


                        <div className="mt-4">
                            <h6 className="mb-1">Értékelés:</h6>
                            <div style={{ fontSize: '1.25rem', fontWeight: '500' }}>
                                ⭐ {ratings}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}