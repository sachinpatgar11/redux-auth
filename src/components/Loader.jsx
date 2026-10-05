const Loader = () => {
  return (
    <div className="loader-container" role="status" aria-label="Loading">
      <div className="loader" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
