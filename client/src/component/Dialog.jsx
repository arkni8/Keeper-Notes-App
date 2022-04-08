import './css/Note-dialog.css';

export default function Dialog(props) {
    const { title, content } = props.content;

    return (
        <>
            <div className='pop-out'>
                <div className='dialog-box'>
                    <main>{title}</main>
                    <section><p>{content}</p></section>
                    <button onClick={()=>props.close({})}>Close</button>
                </div>
            </div>
        </>
    )
}