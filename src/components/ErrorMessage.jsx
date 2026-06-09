function ErrorMessage({ message }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        {message}
      </h2>
    </div>
  );
}

export default ErrorMessage;