function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function App() {
    const [imgAttrs, setImgAttrs] = React.useState({});
    const [inputAttrs, setInputAttrs] = React.useState({
        src: '',
        alt: '',
        width: '',
        height: '',
        className: '',
        id: '',
        style: ''
    });
    const [message, setMessage] = React.useState('');

    // Fetch current image attributes from the server
    React.useEffect(() => {
        fetch('/api/image-attributes')
            .then(response => response.json())
            .then(data => {
                setImgAttrs(data);
                setInputAttrs(data);
            })
            .catch(error => {
                console.error('Error fetching image attributes:', error);
            });
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputAttrs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission to update image attributes
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = getCookie('csrf_token');
        fetch('/api/image-attributes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(inputAttrs)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setMessage(data.message);
                    setImgAttrs(inputAttrs);
                } else if (data.error) {
                    setMessage(data.error);
                }
            })
            .catch(error => {
                console.error('Error updating image attributes:', error);
                setMessage('An error occurred while updating image attributes.');
            });
    };

    return (
        React.createElement('div', { className: 'App' },
            React.createElement('h1', null, 'Quick Image Viewer for Developers'),
            React.createElement('form', { onSubmit: handleSubmit },
                React.createElement('div', null,
                    React.createElement('label', null, 'Image Source (src): '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'src',
                        value: inputAttrs.src,
                        onChange: handleChange,
                        placeholder: 'https://example.com/image.jpg'
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', null, 'Alternative Text (alt): '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'alt',
                        value: inputAttrs.alt,
                        onChange: handleChange,
                        placeholder: 'Description of the image'
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', null, 'Width: '),
                    React.createElement('input', {
                        type: 'number',
                        name: 'width',
                        value: inputAttrs.width,
                        onChange: handleChange,
                        placeholder: 'e.g., 300'
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', null, 'Height: '),
                    React.createElement('input', {
                        type: 'number',
                        name: 'height',
                        value: inputAttrs.height,
                        onChange: handleChange,
                        placeholder: 'e.g., 200'
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', null, 'Class Name: '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'className',
                        value: inputAttrs.className,
                        onChange: handleChange,
                        placeholder: 'e.g., responsive-img'
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', null, 'ID: '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'id',
                        value: inputAttrs.id,
                        onChange: handleChange,
                        placeholder: 'e.g., main-image'
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', null, 'Style: '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'style',
                        value: inputAttrs.style,
                        onChange: handleChange,
                        placeholder: 'e.g., border:1px solid #000;'
                    })
                ),
                React.createElement('button', { type: 'submit' }, 'Update Image')
            ),
            message && React.createElement('p', { style: { color: 'green' } }, message),
            React.createElement('div', { style: { marginTop: '20px' } },
                React.createElement('img', imgAttrs)
            )
        )
    );
}

// Mount the React component to the DOM
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        React.createElement(App, null, null),
        document.getElementById('react-root')
    );
});
