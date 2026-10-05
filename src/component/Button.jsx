

const Button = ({ name }) => {
  return (
    <div className="flex flex-row">
        <button className="bg-gray-200 hover:bg-gray-300 p-2 m-4 rounded">{name}</button>
    </div>
  )
}

export default Button