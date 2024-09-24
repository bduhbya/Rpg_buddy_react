import argparse
import json

BULLET = "â€¢"
TYPE_SEPARATOR = "."
ITEM_SEPARATOR = ","
PL_TAG = "PL"
MR_TAG = "MR"
NAME_TAG = "Name"
EQUIP_TAG = "Equipment"
ADV_TAG = "Advantages"


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
    with open(filename, "r") as f:
        for line in f:
            print(line)
            if BULLET in line:
                json_data.update(parse_name_line(line))
            elif "STR " in line:
                json_data.update(parse_attribute_line(line))
            else:
                remaning_lines += line.strip("\n") + " "
    # print(remaning_lines)
    json_data.update(parse_equipment(remaning_lines))
    print(json_data)


def parse_equipment(remaning_lines):
    equipment_list = remaning_lines.split(EQUIP_TAG + ":")[1].split(TYPE_SEPARATOR)[0]
    equipment_list = equipment_list.split(ITEM_SEPARATOR)
    # for item in equipment_list:
    for i, item in enumerate(equipment_list):
        equipment_list[i] = item.lstrip().rstrip()
    equipment = {EQUIP_TAG: equipment_list}
    return equipment


def parse_attribute_line(line):
    # STR 0 STA 0 AGL 0 DEX 1 FGT 1 INT 2 AWE 2 PRE 3
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
    data = line.split(BULLET)
    name_pl = data[0].split(PL_TAG)
    name_line[NAME_TAG] = name_pl[0].strip()
    name_line[PL_TAG] = name_pl[1].strip()
    name_line[MR_TAG] = data[1].strip()
    print(name_line)
    # json_data = json.dumps(returnDict, indent=2)
    # print(json_data)
    return name_line


def main():
    args = process_args()
    print(args.filename)
    process_file(args.filename)


if __name__ == "__main__":
    main()
