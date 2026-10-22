import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

/**
 * DropzoneArea - MUI-compatible replacement for material-ui-dropzone
 * API compatible with the old DropzoneArea for easier migration.
 */
export function DropzoneArea({
    classes = {},
    filesLimit = 1,
    showPreviewsInDropzone = true,
    showAlerts = true,
    initialFiles = [],
    onChange,
    acceptedFiles = ['image/*'],
    dropzoneText = 'Drag and drop files here, or click to select',
    ...rest
}) {
    const normalizeFiles = React.useCallback(
        (items = []) =>
            items
                .filter((item) => item && !(typeof item === 'string' && item.trim() === ''))
                .map((item) => (typeof item === 'string' ? { preview: item } : item))
                .filter((item) => item && (typeof item === 'string' || item.preview || item instanceof File)),
        []
    );

    const [files, setFiles] = React.useState(() => normalizeFiles(initialFiles));

    const onDrop = React.useCallback(
        (accepted, rejected) => {
            if (filesLimit === 1 && accepted.length > 0) {
                const newFiles = accepted.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                );
                setFiles(newFiles);
                onChange?.(newFiles);
            } else {
                const newFiles = [
                    ...files.filter((f) => !accepted.some((a) => a.preview === f?.preview)),
                    ...accepted.map((file) =>
                        Object.assign(file, { preview: URL.createObjectURL(file) })
                    ),
                ].slice(0, filesLimit);
                setFiles(newFiles);
                onChange?.(newFiles);
            }
        },
        [filesLimit, onChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: acceptedFiles.length
            ? Object.fromEntries(acceptedFiles.map((t) => [t, []]))
            : undefined,
        maxFiles: filesLimit,
        ...rest,
    });

    React.useEffect(() => {
        setFiles(normalizeFiles(initialFiles));
    }, [initialFiles, normalizeFiles]);

    React.useEffect(
        () => () => {
            files.forEach((file) => {
                if (file?.preview && file.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        },
        [files]
    );

    return (
        <Box
            {...getRootProps()}
            className={classes.root}
            sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <input {...getInputProps()} />
            {showPreviewsInDropzone && files.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {files.map((file, idx) => (
                        <Box
                            key={idx}
                            component="img"
                            src={file?.preview}
                            alt=""
                            sx={{
                                maxWidth: 100,
                                maxHeight: 100,
                                objectFit: 'contain',
                            }}
                        />
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    {dropzoneText}
                </Typography>
            )}
        </Box>
    );
}

export default DropzoneArea;
