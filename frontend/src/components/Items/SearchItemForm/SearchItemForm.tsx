import React, { ChangeEvent, FC, FormEvent } from 'react';

interface AddItemProps {
  searchItems(event: ChangeEvent<HTMLInputElement>): void;
  search: string;
}

const SearchItemForm: FC<AddItemProps> = ({ searchItems, search }) => {
  return (
    <>
      <h3 style={{ marginTop: '25px' }}>Search Item</h3>
      <form>
        <div className='form-group'>
          <input
            style={{ marginTop: '25px', marginBottom: '25px' }}
            type='text'
            value={search}
            name='search'
            placeholder='Search item'
            onChange={searchItems}
          />
        </div>
      </form>
    </>
  );
};

export default SearchItemForm;
