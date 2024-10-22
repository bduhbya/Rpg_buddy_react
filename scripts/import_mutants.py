import argparse
import re
import json

BULLET = "â€¢"
BULLET_UNICODE = "•"
DASH_UNICODE = "—"
MINUS_UNICODE = "–"
TYPE_SEPARATOR = "."
ITEM_SEPARATOR = ","
PL_TAG = "PL"
MR_TAG = "MR"
NAME_TAG = "Name"
EQUIP_TAG = "Equipment"
ADV_TAG = "Advantages"
SKILLS_TAG = "Skills"
OFFENSE_TAG = "Offense"
DEFENSE_TAG = "Defense"
POWERS_TAG = "Defense"
TOTALS_TAG = "Totals"
STANDARD_TAGS = [EQUIP_TAG, ADV_TAG, SKILLS_TAG, OFFENSE_TAG, DEFENSE_TAG, TOTALS_TAG]
FINAL_LINE_REGEX = re.compile(r"Total .* points.")


def process_args():
    parser = argparse.ArgumentParser(
        description="Import mutants character data from a file"
    )
    parser.add_argument(
        "-f", "--filename", type=str, required=True, help="File containing mutants"
    )
    args = parser.parse_args()
    return args


def process_file(filename):

    json_data = {}
    # After the first 2 lines, we concatenate the rest of the lines
    # because the remaning lines are not uniform
    remaning_lines = ""
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            print(line)
            if BULLET_UNICODE in line:
                json_data.update(parse_name_line(line))
            elif "STR " in line:
                json_data.update(parse_attribute_line(line))
            elif FINAL_LINE_REGEX.search(line):
                remaning_lines += line.strip("\n")
                json_data.update(parse_standard_tags(remaning_lines))
                print("Saving character data for: " + json_data[NAME_TAG])
                print(json_data)
                remaning_lines = ""
            else:
                remaning_lines += line.strip("\n") + " "
    # print(remaning_lines)


def parse_standard_tags(lines):
    json_data = {}
    for tag in STANDARD_TAGS:
        if tag + ":" in lines:
            print("Parsing tag: " + tag)
            json_data.update(parse_tag(tag, lines))
    return json_data


def parse_tag(tag, remaning_lines):
    tag_list = remaning_lines.split(tag + ":")[1].split(TYPE_SEPARATOR)[0]
    tag_list = tag_list.split(ITEM_SEPARATOR)
    tag_dict = {tag: clear_spaces(tag_list)}
    return tag_dict


def clear_spaces(tup):
    for i, item in enumerate(tup):
        tup[i] = item.lstrip().rstrip()
    return tup


def parse_attribute_line(line):
    # STR 0 STA 0 AGL 0 DEX 1 FGT 1 INT 2 AWE 2 PRE 3
    line = line.replace(DASH_UNICODE, "0")
    line = line.replace(MINUS_UNICODE, "-")
    print(line)
    attributes = line.split()
    attribute_dict = {}
    for i in range(0, len(attributes), 2):
        key = attributes[i]
        value = int(attributes[i + 1])
        attribute_dict[key] = value
    print(attribute_dict)
    return attribute_dict


def parse_name_line(line):
    # data = line.split("\u2022")
    name_line = {}
    data = line.split(BULLET_UNICODE)
    name_pl = data[0].split(PL_TAG)
    name_line[NAME_TAG] = name_pl[0].strip()
    name_line[PL_TAG] = name_pl[1].strip()
    name_line[MR_TAG] = data[1].strip()
    print(name_line)
    return name_line


def main():
    args = process_args()
    print(args.filename)
    process_file(args.filename)


if __name__ == "__main__":
    main()
