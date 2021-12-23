import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Modal } from 'antd';
import axiosInstance from '../axios';



function QRScanner() {
    const navigate = useNavigate();
    // const { result, setResult } = useState(null);
    const handleScan = data => {
        if (data) {
            // console.log(typeof (JSON.parse(data)));
            console.log(data);
            const result = { "result": data }

            axiosInstance.patch("http://localhost:8000/api/attendence/update/", result)
                .then(res => {
                    if (res.data.message === 'Success') {
                        Modal.success({
                            content: res.data.message,
                        });
                        navigate("/dashboard/student");
                    }
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response.status === 423) {
                        Modal.error({
                            title: err.response.data.message,
                        });
                        navigate("/dashboard/student");
                    }
                    else {
                        Modal.error({
                            title: err.response.statusText,
                        });
                        navigate("/dashboard/student");
                    }

                })
        }
    }
    const handleError = err => {
        console.error(err)
    }
    return (
        <div>
            <QrReader
                delay={1000}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />

        </div>
    )
}

export default QRScanner
