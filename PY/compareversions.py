import re

def compare_versions(v1, v2):
	def parse_version(input_version):
		# Original regex from (c) semver.org
		match = re.match(r'^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$', input_version)
		if not match:
			return None
		return {
			'common': [int(match.group(1)), int(match.group(2)), int(match.group(3))],
			'prerelease': match.group(4).split('.') if match.group(4) else []
		}

	parsed_v1 = parse_version(v1)
	parsed_v2 = parse_version(v2)

	if not parsed_v1 or not parsed_v2:
		invalid = v1 if not parsed_v1 else v2
		raise ValueError(f'Invalid version string: "{invalid}"')

	common1, prerelease1 = parsed_v1['common'], parsed_v1['prerelease']
	common2, prerelease2 = parsed_v2['common'], parsed_v2['prerelease']

	for i in range(3):
		if common1[i] > common2[i]:
			return 1
		if common1[i] < common2[i]:
			return -1

	# A release version is higher than its prerelease (semver §9)
	if not prerelease1 and prerelease2:
		return 1
	if prerelease1 and not prerelease2:
		return -1
	if not prerelease1 and not prerelease2:
		return 0

	for i in range(max(len(prerelease1), len(prerelease2))):
		pid1 = prerelease1[i] if i < len(prerelease1) else None
		pid2 = prerelease2[i] if i < len(prerelease2) else None

		# The version with more fields has higher precedence (semver §11.4.4)
		if pid1 is None:
			return -1
		if pid2 is None:
			return 1

		is_numeric1 = pid1.isdigit()
		is_numeric2 = pid2.isdigit()

		if is_numeric1 and is_numeric2:
			num1, num2 = int(pid1), int(pid2)
			if num1 != num2:
				return 1 if num1 > num2 else -1
		elif is_numeric1 != is_numeric2:
			# Numeric identifiers have lower precedence than alphanumeric (semver §11.4.1)
			return -1 if is_numeric1 else 1
		else:
			if pid1 != pid2:
				return -1 if pid1 < pid2 else 1

	return 0