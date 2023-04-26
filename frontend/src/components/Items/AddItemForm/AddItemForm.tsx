import React, { ChangeEvent, FC, FormEvent } from 'react';

interface AddItemProps {
  addItem(event: FormEvent<HTMLFormElement>): Promise<void>;
  onChangeItem(event: ChangeEvent<HTMLInputElement>): void;
  itemName: string;
}

const AddItemForm: FC<AddItemProps> = ({ addItem, onChangeItem, itemName }) => {
  return (
    <>
      <h3>Your Items</h3>
      <form onSubmit={addItem}>
        <div className='form-group' style={{ marginBottom: '25px' }}>
          <input
            type='text'
            className='form-control'
            id='itemName'
            aria-describedby='itemHelp'
            placeholder='Write the name of item'
            value={itemName}
            onChange={onChangeItem}
            name='itemName'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add item
        </button>
      </form>
    </>
  );
};

export default AddItemForm;
