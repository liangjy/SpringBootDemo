/**
 * Autogenerated by Thrift Compiler (0.9.3)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package org.apache.hadoop.hbase.thrift.generated;

import org.apache.thrift.scheme.IScheme;
import org.apache.thrift.scheme.SchemeFactory;
import org.apache.thrift.scheme.StandardScheme;

import org.apache.thrift.scheme.TupleScheme;
import org.apache.thrift.protocol.TTupleProtocol;
import org.apache.thrift.protocol.TProtocolException;
import org.apache.thrift.EncodingUtils;
import org.apache.thrift.TException;
import org.apache.thrift.async.AsyncMethodCallback;
import org.apache.thrift.server.AbstractNonblockingServer.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.EnumMap;
import java.util.Set;
import java.util.HashSet;
import java.util.EnumSet;
import java.util.Collections;
import java.util.BitSet;
import java.nio.ByteBuffer;
import java.util.Arrays;
import javax.annotation.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SuppressWarnings({"cast", "rawtypes", "serial", "unchecked"})
/**
 * A BatchMutation object is used to apply a number of Mutations to a single row.
 */
@Generated(value = "Autogenerated by Thrift Compiler (0.9.3)", date = "2016-04-29")
public class BatchMutation implements org.apache.thrift.TBase<BatchMutation, BatchMutation._Fields>, java.io.Serializable, Cloneable, Comparable<BatchMutation> {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("BatchMutation");

  private static final org.apache.thrift.protocol.TField ROW_FIELD_DESC = new org.apache.thrift.protocol.TField("row", org.apache.thrift.protocol.TType.STRING, (short)1);
  private static final org.apache.thrift.protocol.TField MUTATIONS_FIELD_DESC = new org.apache.thrift.protocol.TField("mutations", org.apache.thrift.protocol.TType.LIST, (short)2);

  private static final Map<Class<? extends IScheme>, SchemeFactory> schemes = new HashMap<Class<? extends IScheme>, SchemeFactory>();
  static {
    schemes.put(StandardScheme.class, new BatchMutationStandardSchemeFactory());
    schemes.put(TupleScheme.class, new BatchMutationTupleSchemeFactory());
  }

  public ByteBuffer row; // required
  public List<Mutation> mutations; // required

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    ROW((short)1, "row"),
    MUTATIONS((short)2, "mutations");

    private static final Map<String, _Fields> byName = new HashMap<String, _Fields>();

    static {
      for (_Fields field : EnumSet.allOf(_Fields.class)) {
        byName.put(field.getFieldName(), field);
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, or null if its not found.
     */
    public static _Fields findByThriftId(int fieldId) {
      switch(fieldId) {
        case 1: // ROW
          return ROW;
        case 2: // MUTATIONS
          return MUTATIONS;
        default:
          return null;
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, throwing an exception
     * if it is not found.
     */
    public static _Fields findByThriftIdOrThrow(int fieldId) {
      _Fields fields = findByThriftId(fieldId);
      if (fields == null) throw new IllegalArgumentException("Field " + fieldId + " doesn't exist!");
      return fields;
    }

    /**
     * Find the _Fields constant that matches name, or null if its not found.
     */
    public static _Fields findByName(String name) {
      return byName.get(name);
    }

    private final short _thriftId;
    private final String _fieldName;

    _Fields(short thriftId, String fieldName) {
      _thriftId = thriftId;
      _fieldName = fieldName;
    }

    public short getThriftFieldId() {
      return _thriftId;
    }

    public String getFieldName() {
      return _fieldName;
    }
  }

  // isset id assignments
  public static final Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.ROW, new org.apache.thrift.meta_data.FieldMetaData("row", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING        , "Text")));
    tmpMap.put(_Fields.MUTATIONS, new org.apache.thrift.meta_data.FieldMetaData("mutations", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.ListMetaData(org.apache.thrift.protocol.TType.LIST, 
            new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, Mutation.class))));
    metaDataMap = Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(BatchMutation.class, metaDataMap);
  }

  public BatchMutation() {
  }

  public BatchMutation(
    ByteBuffer row,
    List<Mutation> mutations)
  {
    this();
    this.row = org.apache.thrift.TBaseHelper.copyBinary(row);
    this.mutations = mutations;
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public BatchMutation(BatchMutation other) {
    if (other.isSetRow()) {
      this.row = other.row;
    }
    if (other.isSetMutations()) {
      List<Mutation> __this__mutations = new ArrayList<Mutation>(other.mutations.size());
      for (Mutation other_element : other.mutations) {
        __this__mutations.add(new Mutation(other_element));
      }
      this.mutations = __this__mutations;
    }
  }

  public BatchMutation deepCopy() {
    return new BatchMutation(this);
  }

  
  public void clear() {
    this.row = null;
    this.mutations = null;
  }

  public byte[] getRow() {
    setRow(org.apache.thrift.TBaseHelper.rightSize(row));
    return row == null ? null : row.array();
  }

  public ByteBuffer bufferForRow() {
    return org.apache.thrift.TBaseHelper.copyBinary(row);
  }

  public BatchMutation setRow(byte[] row) {
    this.row = row == null ? (ByteBuffer)null : ByteBuffer.wrap(Arrays.copyOf(row, row.length));
    return this;
  }

  public BatchMutation setRow(ByteBuffer row) {
    this.row = org.apache.thrift.TBaseHelper.copyBinary(row);
    return this;
  }

  public void unsetRow() {
    this.row = null;
  }

  /** Returns true if field row is set (has been assigned a value) and false otherwise */
  public boolean isSetRow() {
    return this.row != null;
  }

  public void setRowIsSet(boolean value) {
    if (!value) {
      this.row = null;
    }
  }

  public int getMutationsSize() {
    return (this.mutations == null) ? 0 : this.mutations.size();
  }

  public java.util.Iterator<Mutation> getMutationsIterator() {
    return (this.mutations == null) ? null : this.mutations.iterator();
  }

  public void addToMutations(Mutation elem) {
    if (this.mutations == null) {
      this.mutations = new ArrayList<Mutation>();
    }
    this.mutations.add(elem);
  }

  public List<Mutation> getMutations() {
    return this.mutations;
  }

  public BatchMutation setMutations(List<Mutation> mutations) {
    this.mutations = mutations;
    return this;
  }

  public void unsetMutations() {
    this.mutations = null;
  }

  /** Returns true if field mutations is set (has been assigned a value) and false otherwise */
  public boolean isSetMutations() {
    return this.mutations != null;
  }

  public void setMutationsIsSet(boolean value) {
    if (!value) {
      this.mutations = null;
    }
  }

  public void setFieldValue(_Fields field, Object value) {
    switch (field) {
    case ROW:
      if (value == null) {
        unsetRow();
      } else {
        setRow((ByteBuffer)value);
      }
      break;

    case MUTATIONS:
      if (value == null) {
        unsetMutations();
      } else {
        setMutations((List<Mutation>)value);
      }
      break;

    }
  }

  public Object getFieldValue(_Fields field) {
    switch (field) {
    case ROW:
      return getRow();

    case MUTATIONS:
      return getMutations();

    }
    throw new IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new IllegalArgumentException();
    }

    switch (field) {
    case ROW:
      return isSetRow();
    case MUTATIONS:
      return isSetMutations();
    }
    throw new IllegalStateException();
  }

  
  public boolean equals(Object that) {
    if (that == null)
      return false;
    if (that instanceof BatchMutation)
      return this.equals((BatchMutation)that);
    return false;
  }

  public boolean equals(BatchMutation that) {
    if (that == null)
      return false;

    boolean this_present_row = true && this.isSetRow();
    boolean that_present_row = true && that.isSetRow();
    if (this_present_row || that_present_row) {
      if (!(this_present_row && that_present_row))
        return false;
      if (!this.row.equals(that.row))
        return false;
    }

    boolean this_present_mutations = true && this.isSetMutations();
    boolean that_present_mutations = true && that.isSetMutations();
    if (this_present_mutations || that_present_mutations) {
      if (!(this_present_mutations && that_present_mutations))
        return false;
      if (!this.mutations.equals(that.mutations))
        return false;
    }

    return true;
  }

  
  public int hashCode() {
    List<Object> list = new ArrayList<Object>();

    boolean present_row = true && (isSetRow());
    list.add(present_row);
    if (present_row)
      list.add(row);

    boolean present_mutations = true && (isSetMutations());
    list.add(present_mutations);
    if (present_mutations)
      list.add(mutations);

    return list.hashCode();
  }

  
  public int compareTo(BatchMutation other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;

    lastComparison = Boolean.valueOf(isSetRow()).compareTo(other.isSetRow());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetRow()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.row, other.row);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetMutations()).compareTo(other.isSetMutations());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetMutations()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.mutations, other.mutations);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    return 0;
  }

  public _Fields fieldForId(int fieldId) {
    return _Fields.findByThriftId(fieldId);
  }

  public void read(org.apache.thrift.protocol.TProtocol iprot) throws org.apache.thrift.TException {
    schemes.get(iprot.getScheme()).getScheme().read(iprot, this);
  }

  public void write(org.apache.thrift.protocol.TProtocol oprot) throws org.apache.thrift.TException {
    schemes.get(oprot.getScheme()).getScheme().write(oprot, this);
  }

  
  public String toString() {
    StringBuilder sb = new StringBuilder("BatchMutation(");
    boolean first = true;

    sb.append("row:");
    if (this.row == null) {
      sb.append("null");
    } else {
      org.apache.thrift.TBaseHelper.toString(this.row, sb);
    }
    first = false;
    if (!first) sb.append(", ");
    sb.append("mutations:");
    if (this.mutations == null) {
      sb.append("null");
    } else {
      sb.append(this.mutations);
    }
    first = false;
    sb.append(")");
    return sb.toString();
  }

  public void validate() throws org.apache.thrift.TException {
    // check for required fields
    // check for sub-struct validity
  }

  private void writeObject(java.io.ObjectOutputStream out) throws java.io.IOException {
    try {
      write(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(out)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private void readObject(java.io.ObjectInputStream in) throws java.io.IOException, ClassNotFoundException {
    try {
      read(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(in)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private static class BatchMutationStandardSchemeFactory implements SchemeFactory {
    public BatchMutationStandardScheme getScheme() {
      return new BatchMutationStandardScheme();
    }
  }

  private static class BatchMutationStandardScheme extends StandardScheme<BatchMutation> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, BatchMutation struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // ROW
            if (schemeField.type == org.apache.thrift.protocol.TType.STRING) {
              struct.row = iprot.readBinary();
              struct.setRowIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 2: // MUTATIONS
            if (schemeField.type == org.apache.thrift.protocol.TType.LIST) {
              {
                org.apache.thrift.protocol.TList _list0 = iprot.readListBegin();
                struct.mutations = new ArrayList<Mutation>(_list0.size);
                Mutation _elem1;
                for (int _i2 = 0; _i2 < _list0.size; ++_i2)
                {
                  _elem1 = new Mutation();
                  _elem1.read(iprot);
                  struct.mutations.add(_elem1);
                }
                iprot.readListEnd();
              }
              struct.setMutationsIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          default:
            org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
        }
        iprot.readFieldEnd();
      }
      iprot.readStructEnd();

      // check for required fields of primitive type, which can't be checked in the validate method
      struct.validate();
    }

    public void write(org.apache.thrift.protocol.TProtocol oprot, BatchMutation struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      if (struct.row != null) {
        oprot.writeFieldBegin(ROW_FIELD_DESC);
        oprot.writeBinary(struct.row);
        oprot.writeFieldEnd();
      }
      if (struct.mutations != null) {
        oprot.writeFieldBegin(MUTATIONS_FIELD_DESC);
        {
          oprot.writeListBegin(new org.apache.thrift.protocol.TList(org.apache.thrift.protocol.TType.STRUCT, struct.mutations.size()));
          for (Mutation _iter3 : struct.mutations)
          {
            _iter3.write(oprot);
          }
          oprot.writeListEnd();
        }
        oprot.writeFieldEnd();
      }
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class BatchMutationTupleSchemeFactory implements SchemeFactory {
    public BatchMutationTupleScheme getScheme() {
      return new BatchMutationTupleScheme();
    }
  }

  private static class BatchMutationTupleScheme extends TupleScheme<BatchMutation> {

    
    public void write(org.apache.thrift.protocol.TProtocol prot, BatchMutation struct) throws org.apache.thrift.TException {
      TTupleProtocol oprot = (TTupleProtocol) prot;
      BitSet optionals = new BitSet();
      if (struct.isSetRow()) {
        optionals.set(0);
      }
      if (struct.isSetMutations()) {
        optionals.set(1);
      }
      oprot.writeBitSet(optionals, 2);
      if (struct.isSetRow()) {
        oprot.writeBinary(struct.row);
      }
      if (struct.isSetMutations()) {
        {
          oprot.writeI32(struct.mutations.size());
          for (Mutation _iter4 : struct.mutations)
          {
            _iter4.write(oprot);
          }
        }
      }
    }

    
    public void read(org.apache.thrift.protocol.TProtocol prot, BatchMutation struct) throws org.apache.thrift.TException {
      TTupleProtocol iprot = (TTupleProtocol) prot;
      BitSet incoming = iprot.readBitSet(2);
      if (incoming.get(0)) {
        struct.row = iprot.readBinary();
        struct.setRowIsSet(true);
      }
      if (incoming.get(1)) {
        {
          org.apache.thrift.protocol.TList _list5 = new org.apache.thrift.protocol.TList(org.apache.thrift.protocol.TType.STRUCT, iprot.readI32());
          struct.mutations = new ArrayList<Mutation>(_list5.size);
          Mutation _elem6;
          for (int _i7 = 0; _i7 < _list5.size; ++_i7)
          {
            _elem6 = new Mutation();
            _elem6.read(iprot);
            struct.mutations.add(_elem6);
          }
        }
        struct.setMutationsIsSet(true);
      }
    }
  }

}

