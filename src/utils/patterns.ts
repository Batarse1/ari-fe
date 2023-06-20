const secret_validation = /^[a-z0-9A-Z\u00C0-\u00FF]*$/;
const delimiter_validation = /^.$/;
const type_validation = /^(XML|JSON|TXT)$/;

export { secret_validation, delimiter_validation, type_validation };
