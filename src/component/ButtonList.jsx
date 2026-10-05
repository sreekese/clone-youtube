import Button from "./Button"

const list = ["All", "Music", "Gaming", "News", "Sports", "Movies", "Fashion", "Education", "Comedy", "Travel"]

const ButtonList = () => {
  return (
    <div className="flex flex-row overflow-x-auto">
        {list.map((item) => (
            <Button name={item} />
        ))}
    </div>

  )
}

export default ButtonList