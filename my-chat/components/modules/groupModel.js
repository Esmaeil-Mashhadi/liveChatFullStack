'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './groupModal.module.css';
import { IoMdCloseCircle } from 'react-icons/io';

const GroupModal = ({ groups, addHandler, setData, data, setShowGroupModal, title, setShowModal }) => {
  const [disabled, setDisabled] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (groups.length === 4) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [groups]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('title', title);

    const res = await fetch('http://localhost:4000/chat/add-groups', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await res.json();
    console.log(result);

    if (result.status === 201) {
      setShowGroupModal(false);
      setShowModal(false);
    }
  };

  const cancelHandler = () => {
    setData({ ...data, groups: [''] });
    setShowGroupModal(false);
  };

  return (
    <form encType="multipart/form-data" onSubmit={submitHandler} className={styles.modalContainer}>
      <div ref={scrollRef} className={styles.subContainer}>
        {groups.map((_, index) => (
          <div key={index} className={styles.groupInputes}>
            <div className={styles.inputContainer}>
              <label>Name:</label>
              <input name="name" maxLength={25} />
            </div>

            <div className={styles.inputContainer}>
              <label>Image:</label>
              <input name="image" type="file" />
            </div>

            <div className={styles.inputContainer}>
              <label>Description:</label>
              <input name="description" />
            </div>

            <button
              type="button"
              disabled={groups.length === 1}
              className={styles.remove}
              onClick={() => {
                const updatedGroups = [...groups];
                updatedGroups.splice(index, 1);
                setData({ ...data, groups: updatedGroups });
              }}
            >
              {groups.length === 1 ? <span>At least one group needed</span> : <span>Remove Group</span>}
              <IoMdCloseCircle />
            </button>
          </div>
        ))}

        <div className={styles.topButtonContainer}>
          <button type="submit">Create Group</button>
          <button
            type="button"
            title={disabled ? 'Maximum 4 groups can be created' : ''}
            disabled={disabled}
            onClick={addHandler}
          >
            Add more Groups
          </button>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default GroupModal;
