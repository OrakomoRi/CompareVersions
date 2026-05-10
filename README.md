# Compare Versions Tool

Based on [Semantic Versioning 2.0.0](https://semver.org/).

The compareVersions function is a utility for comparing two version strings and determining their relationship. The comparison considers numerical values as well as additional identifiers that can contain both letters and numbers.

For full understanding visit the [official documentation](https://semver.org/#semantic-versioning-specification-semver).

## Connect

Check the needed folder (e.g. JS, PY) to find the way to connect.

## Documentation

### Signature

```
compareVersions(version1, version2)
```

### Parameters

- **version1** `String` — the first version string to compare
- **version2** `String` — the second version string to compare

### Return values

| Value | Meaning |
|-------|---------|
| `1`   | `version1` is greater than `version2` |
| `-1`  | `version1` is less than `version2` |
| `0`   | `version1` is equal to `version2` |

### Errors

Throws an exception if either version string has an incorrect format.

### Version string format

- Version number in format: `MAJOR.MINOR.PATCH`
- Pre-release identifiers are available after `-` (hyphen): `1.0.0-alpha.1`
- Build metadata identifiers are available after `+` (plus): `1.0.0+build.1`
- A version MAY NOT contain pre-release or metadata identifiers, but MAY contain either one or both simultaneously
- Build metadata is ignored when determining version precedence
- Versions prefixed with `v` are not supported

### Examples

#### Correct format

- `1.5.0`
- `1.2.3-pre1.2.3`
- `0.2.4-release`
- `2.9.3-rc.3.beta`
- `2.2.9+version------fixed`
- `0.0.1+build0.1`

#### Incorrect format

- 1 (common version number MUST take the form X.Y.Z)
- 3.8 (common version number MUST take the form X.Y.Z)
- 5.2 build-5 (spaces cannot be used)
- 4.2_alpha2 (underscore cannot be used)
- v1,4 (no comma can be used, also no 'v' before version is needed)
