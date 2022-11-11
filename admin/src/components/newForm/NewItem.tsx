import React from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { INewItemInput } from '../../static/types/types';

interface IPropsNewInput extends INewItemInput {
    handleChangeText: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => void;
}

const NewItem: React.FC<IPropsNewInput> = (props) => {
    const { id, htmlId, label, type, placeholder, handleChangeText } = props;

    return (
        <>
            {type !== '' && (
                <div className='formInput'>
                    <label
                        htmlFor={htmlId}
                        className={id === 0 ? 'img' : undefined}
                    >
                        {label}
                        {id === 0 ? (
                            <MdOutlineDriveFolderUpload className='icon' />
                        ) : null}
                    </label>

                    <input
                        type={type}
                        id={htmlId}
                        name={htmlId}
                        placeholder={placeholder}
                        style={id === 0 ? { display: 'none' } : undefined}
                        onChange={(e) => handleChangeText(e)}
                    />
                </div>
            )}

            {htmlId === 'genre' && (
                <div className='formInput'>
                    <label htmlFor='genre'>Genre:</label>

                    <select
                        name='genre'
                        id='genre'
                        onChange={(e) => handleChangeText(e)}
                        defaultValue='adventure'
                    >
                        <option value='adventure'>Adventure</option>
                        <option value='comedy'>Comedy</option>
                        <option value='crime'>Crime</option>
                        <option value='fantasy'>Fantasy</option>
                        <option value='historical'>Historical</option>
                        <option value='horror'>Horror</option>
                        <option value='romance'>Romance</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='thriller'>Thriller</option>
                        <option value='western'>Western</option>
                        <option value='animation'>Animation</option>
                        <option value='drama'>Drama</option>
                        <option value='documentary'>Documentary</option>
                    </select>
                </div>
            )}

            {htmlId === 'isSeries' && (
                <div className='formInput'>
                    <label htmlFor='isSeries'>Is series?</label>

                    <select
                        name='isSeries'
                        id='isSeries'
                        onChange={(e) => handleChangeText(e)}
                        defaultValue='false'
                    >
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                    </select>
                </div>
            )}
        </>
    );
};

export default NewItem;
