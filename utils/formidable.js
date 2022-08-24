import formidable from 'formidable';

export default function form(req, options) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm(options);

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}
