import React, { useState, useEffect } from 'react';
import { Table, Upload, message, Button } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';

const UploadProductImages = ({totalImages, setTotalImages}) => {
    
    const [imageAcceptedBool, setImageAcceptedBool] = useState(false);    

    //Hide Image Table If No Images
    useEffect(() => {
        //Checking Total Image Array Length 
        if (totalImages.length == 0) {
            setImageAcceptedBool(false);
        }
    }, [totalImages]);

    //Antd uploader        
    const { Dragger } = Upload;

    //Upload Dragger Props
    const draggerProps = {
        name: "imageUploader",
        multiple: true,
        // accept: ".png,.jpg,.jpeg",
        showUploadList: false,
        customRequest: ({file, onSuccess }) => {
            onSuccess('ok');
        },
        beforeUpload: fileInfo => {
            if (fileInfo.type.split("/")[0] === "image") {
                return true;
            } else {
                message.error("Uploaded file must be image.");
                return false;
            }
        },
        onChange(fileInfo) {
            let filteredImage = [];
            if (fileInfo.file.status == "done") {                
                fileInfo.fileList.forEach(file => {
                    let fileType = file.type.split("/")[0];
                    if (fileType === "image") {                        
                        file.originFileObj.fileName=file.originFileObj.name;
                        filteredImage.push(file.originFileObj);
                    }
                });
                setTotalImages(filteredImage);
                setImageAcceptedBool(true);                

            }
        },
        style: {
            minHeight: "200px",
            alignItems: "center",
            display: "flex"
        }
    };

    //Images Table Columns
    const imageTableColumns = [
        {
            title: "Image Name",
            dataIndex: "imageName",
            key: "imageName",

        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "20%",
            align: "center",
            render: (text, record, index) => (
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        //Remove Image
                        let removedImageArr = totalImages.filter(data => data.uid != record.uid);
                        setTotalImages([...removedImageArr]);
                    }}
                />
            )
        }
    ];

    
    const imageTableData = totalImages.map((imageObj, i) => ({
        key: i,
        imageName: imageObj.name,
        uid: imageObj.uid
    }));

    return (
        <div>
            <Dragger
                {...draggerProps}
                fileList={totalImages} //Resetting Antd Upload File List 
            >
                <InboxOutlined style={{ fontSize: "2rem" }} />
                <p className="ant-upload-text">Click or drag images to upload.</p>
            </Dragger>
            {
                imageAcceptedBool ?
                    <div>
                        <Table
                            columns={imageTableColumns}
                            bordered={true}
                            dataSource={imageTableData}
                            style={{ padding: "10px 0px" }}
                        />
                    </div>
                    :
                    ""
            }
        </div>

    );

}

export default UploadProductImages;