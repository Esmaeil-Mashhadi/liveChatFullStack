"use client"

import { useEffect, useState } from "react"
import styles from "./groupList.module.css"
import { BsChatDotsFill } from "react-icons/bs"
import GroupModal from "./groupModel"

const GroupList = ({
  socket,
  initNameSpaceConnection,
  setNameSpaces,
  nameSpaces,
}) => {
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    socket.on("nameSpacesList", (data) => {
      setNameSpaces(data)
    })
  }, [])

  const listHandler = (endpoint, roomName) => {
    initNameSpaceConnection(endpoint, roomName)
  }

  return (
    <div className={styles.groupList}>
      <BsChatDotsFill /> Groups
      <ul className={styles.groupsContainer}>
        {nameSpaces.map((group) => {
          return (
            <li
              onClick={() => listHandler(group.endpoint, group.rooms[0].name)}
            >
              {group.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GroupList
